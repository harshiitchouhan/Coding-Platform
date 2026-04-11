import { useForm } from "react-hook-form";


function Signup (){


  const {register,handleSubmit,formState: { errors },} = useForm();
  
  function submitForm(data){
    console.log(data);

  }

    return(
      <>
      <form onSubmit={handleSubmit({submitForm})} >
        
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" {...register, "name"}/>
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input  {...register, "email"}/>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input  {...register, "password"}/>
        </div>

      </form>
      </>
  )

}

export default Signup;