const bcrypt = require('bcryptjs');
const transporter = require("../middlewares/transporter")
// const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
// const { generateAccessToken, generateRefreshToken, hashToken } = require('../utils/tokenUtils');
const tokenUtils = require("../utils/tokenUtils")
// const COOKIE_OPTIONS = {
//   httpOnly: true,
//   secure: process.env.COOKIE_SECURE === 'true',
//   sameSite: 'strict',
//   maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
// };

// ✅ Signup
exports.signup = async (req, res) => {
  // const { username, password } = req.body;
  const name = req.body.name
  const password = req.body.password
  const email = req.body.email;
  const verify=false;
  const role = req.body.role;
  const otp = Math.round(Math.random()*1000);  
  try {
    if (await User.findOne({ email }))
    {
      return res.json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({name:name,
      password:hashedPassword,
        email: email,
  verify:verify,
  role:role,
   otp:otp,
    })
    // await User.create({ username, password: hashedPassword });
    await newUser.save()
    
    const info = await transporter.sendMail({
    to: email,
    subject: "OTP For Verification",
    // text: "Please open link enter " +otp +"to verify your email", // plain‑text body
    html: `<a href="http://localhost:5173/verifyotp/${email}">Click here </a>
     to verify and Enter OTP: ${otp}
     if link is not working paste "http://localhost:5173/verifyotp/${email}"
     in browser`
   // HTML body
  });
    res.status(201).json({ message: 'User registered',link:"http://localhost:5173/verifyotp/"+email, userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.verifyOtp = async(req,res)=>
{
  const {email,otp}=req.body;
  let user = await User.findOne({email:email})
  if(!user)
  {
    res.send({msg:"Email not registered"})
  }
  else
  {
    // res.send({msg:"Email present"})
        if(otp== user.otp)
        {
         
         let d= await User.updateOne({email:email},{$set:{verify:true}})
         if(d.modifiedCount==1)
         {
          res.send({msg:"Email successfully verified "})
         }
         else
         {
          res.send({msg:"Already verfied email"})
         }
        }
        else
        {
          res.send({msg:"invalid otp "})
        }
  }
}
exports.login = async(req,res)=>
{
  const {username,password} = req.body
  let user = await  User.findOne({username})
  if(!user){
    return res.status(500).json({message:"username not found"})
  }
  const ispwd =await bcrypt.compare(password,user.password)
  console.log(ispwd)
  if(ispwd)
  {
    // res.send("valid user")
    const payload = {userId : user._id,username:user.username}
    const accessToken = tokenUtils.generateAccessToken(payload)
    const refreshToken = tokenUtils.generateRefreshToken(payload)

    user.refreshTokens.push({tokenHash:tokenUtils.hashToken(refreshToken),
      createdAt:new Date()})
    await user.save()
    res.json({accessToken})
  }
  else
  {
  return res.status(500).json({message:"Invalid password"})    
  }
}
// // ✅ Login
// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user)
//       { return res.status(400).json({ message: 'Invalid credentials' });
//   }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) 
//      {return res.status(400).json({ message: 'Invalid credentials' });
//   }

//     const payload = { userId: user._id, username: user.username };
//     const accessToken = generateAccessToken(payload);
//     const refreshToken = generateRefreshToken(payload);

//     user.refreshTokens.push({ tokenHash: hashToken(refreshToken), createdAt: new Date() });
//     await user.save();

//     res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
//     res.json({ accessToken });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// ✅ Refresh Token
// exports.refreshToken = async (req, res) => {
//   const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
//   if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

//   try {
//     const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     const user = await User.findById(payload.userId);
//     if (!user) return res.status(401).json({ message: 'User not found' });

//     const tokenHash = hashToken(refreshToken);
//     const tokenExists = user.refreshTokens.some(t => t.tokenHash === tokenHash);
//     if (!tokenExists) return res.status(403).json({ message: 'Refresh token revoked' });

//     const newAccessToken = generateAccessToken({ userId: user._id, username: user.username });
//     res.json({ accessToken: newAccessToken });
//   } catch (error) {
//     res.status(403).json({ message: 'Invalid refresh token' });
//   }
// };

// ✅ Logout
// exports.logout = async (req, res) => {
//   const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

//   if (refreshToken) {
//     try {
//       const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//       const user = await User.findById(payload.userId);
//       if (user) {
//         user.refreshTokens = user.refreshTokens.filter(
//           t => t.tokenHash !== hashToken(refreshToken)
//         );
//         await user.save();
//       }
//     } catch (err) {
//       // ignore invalid token
//     }
//   }

//   res.clearCookie('refreshToken', COOKIE_OPTIONS);
//   res.json({ message: 'Logged out successfully' });
// };
