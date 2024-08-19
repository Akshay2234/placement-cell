import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/SignupModel.js';
import generateToken  from '../config/generateToken.js';
const signup = asyncHandler(async (req, res) => {
    const {
        username, email, fullname, password, dob, degree, course, sgpa1, sgpa2, sgpa3, sgpa4, sgpa5, sgpa6,
        twelfthPercentage, diplomaPercentage, nationality, cgpa, address, school12th, tenthPercentage,
        gapYear, specialisation, yearOfPassing, backlogs1, backlogs2, backlogs3, backlogs4, backlogs5, backlogs6
    } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            username,
            email,
            fullname,
            password: hashedPassword,
            dob,
            degree,
            course,
            sgpa1,
            sgpa2,
            sgpa3,
            sgpa4,
            sgpa5,
            sgpa6,
            twelfthPercentage,
            diplomaPercentage,
            nationality,
            cgpa,
            address,
            school12th,
            tenthPercentage,
            gapYear,
            specialisation,
            yearOfPassing,
            backlogs1,
            backlogs2,
            backlogs3,
            backlogs4,
            backlogs5,
            backlogs6
        });

        if(user){
        res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    dob: user.dob,
    degree: user.degree,
    course: user.course,
    sgpa1: user.sgpa1,
    sgpa2: user.sgpa2,
    sgpa3: user.sgpa3,
    sgpa4: user.sgpa4,
    sgpa5: user.sgpa5,
    sgpa6: user.sgpa6,
    twelfthPercentage: user.twelfthPercentage,
    diplomaPercentage: user.diplomaPercentage,
    nationality: user.nationality,
    cgpa: user.cgpa,
    address: user.address,
    school12th: user.school12th,
    tenthPercentage: user.tenthPercentage,
    gapYear: user.gapYear,
    specialisation: user.specialisation,
    yearOfPassing: user.yearOfPassing,
    backlogs1: user.backlogs1,
    backlogs2: user.backlogs2,
    backlogs3: user.backlogs3,
    backlogs4: user.backlogs4,
    backlogs5: user.backlogs5,
    backlogs6: user.backlogs6,
    token: generateToken(user._id)
        });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        dob: user.dob,
        degree: user.degree,
        course: user.course,
        sgpa1: user.sgpa1,
        sgpa2: user.sgpa2,
        sgpa3: user.sgpa3,
        sgpa4: user.sgpa4,
        sgpa5: user.sgpa5,
        sgpa6: user.sgpa6,
        twelfthPercentage: user.twelfthPercentage,
        diplomaPercentage: user.diplomaPercentage,
        nationality: user.nationality,
        cgpa: user.cgpa,
        address: user.address,
        school12th: user.school12th,
        tenthPercentage: user.tenthPercentage,
        gapYear: user.gapYear,
        specialisation: user.specialisation,
        yearOfPassing: user.yearOfPassing,
        backlogs1: user.backlogs1,
        backlogs2: user.backlogs2,
        backlogs3: user.backlogs3,
        backlogs4: user.backlogs4,
        backlogs5: user.backlogs5,
        backlogs6: user.backlogs6,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid email or password');
    }
  });

export { signup,authUser };
