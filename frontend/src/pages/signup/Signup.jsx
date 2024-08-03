import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {
  const [inputs,setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  })

  const {loading,signup} = useSignup();

  const handleCheckBoxChange = (gender)=>{
    setInputs({...inputs,gender})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault() //to prevent refresh on clicking submitting button 
    await signup(inputs)
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
     <h1 className='text-3xl font semibold text-center text-white'>
     Sign Up <span className='text-blue-500'> Synchronous</span>
     </h1> 
     <form onSubmit={handleSubmit}>
      <div>
      <label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
			</label>
      <input type='text' placeholder='Jay Kumar' className='w-full input input-bordered h-10'
        value={inputs.fullName}
        onChange={(e)=> setInputs({...inputs , fullName: e.target.value})}
        /*
        Spread Operator (...inputs):

        The spread operator (...inputs) is used to create a shallow copy of the current inputs state. This ensures that all existing key-value pairs in the inputs state are retained.
        Updating the fullName Property:

        {...inputs, fullName: e.target.value}: This creates a new object that copies all properties from the current inputs state and updates the fullName property with the current value of the input field (e.target.value).
        Setting the New State:

        The new object is then passed to the setInputs function, which updates the state with this new object. This effectively updates the fullName property in the inputs state without altering the other properties.
         */
      />
      </div>

      <div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='jaykumar'
							className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e)=> setInputs({...inputs , username: e.target.value})}
						/>
			 </div>

      <div>
      <label className='label'>
							<span className='text-base label-text'>Username</span>
			</label>
        <input
          type='password'
          placeholder='Enter Password'
          className='w-full input input-bordered h-10'
          value={inputs.password}
          onChange={(e)=> setInputs({...inputs , password: e.target.value})}
        />
      </div>

      <div>
      <label className='label'>
							<span className='text-base label-text'>Username</span>
			</label>
        <input
          type='password'
          placeholder='Confirm Password'
          className='w-full input input-bordered h-10'
          value={inputs.confirmPassword}
          onChange={(e)=> setInputs({...inputs , confirmPassword: e.target.value})}
        />
      </div>

      <GenderCheckbox onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender}/>

      <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
      href='#'
      >
        Already have an account?
      </Link>

      <div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
     </form>
    </div>
    </div>
  )
}

export default SignUp