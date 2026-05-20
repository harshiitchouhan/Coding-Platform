import MainLayout from "../layouts/MainLayout";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "@/Utils/axiosClient";
import AdminNavbar from "../admin/AdminNavbar";


const formSchema = z.object({
    title:z.string().min(1,"Title is Required"),
    description:z.string().min(1,"Description is Required"),
    difficultyLevel:z.enum(["easy","medium","hard"]),
    category:z.enum(["array" ,"linkedList" ,"graph" ,"dp" ,"string" , "tree"]),
    visibleTestCases:z.array(
        z.object({
            input:z.string().min(1,"Input is Required"),
            output:z.string().min(1,"Output is Required"),
            explanation:z.string().min(1,"Explanation is Required")
        })
    ).min(1,"Atleast One Visible Test Case is Required"),

    hiddenTestCases:z.array(
        z.object({
            input:z.string().min(1,"Input is Required"),
            output:z.string().min(1,"Output is Required"),
            explanation:z.string().min(1,"Explanation is Required")
        })
    ).min(1,"Atleast One Hidden Test Case is Required"),

    startCode:z.array(
        z.object({
            language:z.enum(["cpp","java","javascript"]),
            boilerCode:z.string().min(1,"Initial Code is Required")

        })
    ).length(3,"All Three Languages Required"),

    refSolution:z.array(
        z.object({
            language:z.enum(["cpp","java","javascript"]),
            completeCode:z.string().min(1,"Initial Code is Required")

        })
    ).length(3,"All Three Languages Required"),

    functionSignature: z.object({
    cpp: z.string().min(1, "C++ signature required"),
    javascript: z.string().min(1, "JS signature required"),
    java: z.string().min(1, "Java signature required"),
  }),

  functionName: z.string().min(1, "Function Name is Required"),

  constraints: z.string().optional(),
  companies: z.string().optional(),
  hints: z.string().optional(),



})

export default function AdminPanel(){

    const navigate = useNavigate();
    const {
    register,
    control,
    handleSubmit,
    formState: { errors }} = useForm(
        {
        resolver: zodResolver(formSchema),
        defaultValues: {
        visibleTestCases: [{ input: "", output: "", explanation: "" }],
        hiddenTestCases: [{ input: "", output: "", explanation: "" }],
        startCode: [
        { language: "cpp", boilerCode: "" },
        { language: "java", boilerCode: "" },
        { language: "javascript", boilerCode: "" },
        ],
        refSolution: [
        { language: "cpp", completeCode: "" },
        { language: "java", completeCode: "" },
        { language: "javascript", completeCode: "" },
        ],
        functionName: "",
          functionSignature: {
            cpp: "",
            javascript: "",
            java: ""
          },
  },
        constraints: "",
        companies: "",
        hints: "",
        inputFields:"",
});

    const {
        fields: visibleFields,
        append: addVisible,
        remove: removeVisible,
    } = useFieldArray({
        control,
        name: "visibleTestCases",
    });

    const {
        fields: hiddenFields,
        append: addHidden,
        remove: removeHidden,
    } = useFieldArray({
        control,
        name: "hiddenTestCases",
    });

    const {fields: refFields,} = useFieldArray(
      {
      control,
      name: "refSolution",
    });


    // const onSubmit= async(data)=>{
    //     try{
    //         // console.log("SUBMIT DATA:", data);
    //         await axiosClient.post("/problem/create",data);
    //         alert("Problem Created Succesfully");
    //         // navigate("/")

    //     }
    //     catch(err){
    //         // console.log(err.response?.data);
    //         alert(JSON.stringify(err.response?.data));
    //     }
    // }
    const onSubmit = async (data) => {
        try {
          const payload = {
            ...data,

            // convert "Amazon, Google" → ["Amazon", "Google"]
            companies: data.companies
              ? data.companies.split(",").map(c => c.trim()).filter(Boolean)
              : [],

            // convert textarea lines → array
            hints: data.hints
              ? data.hints.split("\n").map(h => h.trim()).filter(Boolean)
              : [],

            // INPUT FEIDLS(EG NumS AND tARGET)
            inputFields: data.inputFields
          ? data.inputFields.split("\n").map(f => f.trim()).filter(Boolean)
          : [],

            // keep constraints as string
            constraints: data.constraints || "",
          };

          // console.log("FINAL PAYLOAD:", payload);

          await axiosClient.post("/problem/create", payload);

          alert("Problem Created Successfully");
        } catch (err) {
          alert(JSON.stringify(err.response?.data));
        }
      };

    
    return(
    <MainLayout showNavbar={false}>
      
        <AdminNavbar></AdminNavbar>
        <div className="min-h-screen text-white py-10 flex justify-center">
          
        <div className="w-full max-w-4xl p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/30">
        
        <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">
            Create Problem
        </h1>

    <form className="space-y-8"
      onSubmit={handleSubmit(
        onSubmit,
        (errors) => {
          // console.log("FORM ERRORS:", errors);
          alert("Form has errors. Check console.");
        }
      )}
    >

        {/* Title */}
        <input
          placeholder="Title"
          {...register("title")}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-400">{errors.title.message}</p>}

        {/* Description */}
        <textarea
          placeholder="Description"
          {...register("description")}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && <p className="text-red-400">{errors.description.message}</p>}

        {/* Difficulty + Category */}
      <div className="flex gap-6">
        
        {/* Difficulty */}
        <select
          {...register("difficultyLevel")}
          className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white appearance-none"
        >
          <option value="" className="bg-[#111827] text-white">
            Select Difficulty
          </option>
          <option value="easy" className="bg-[#111827] text-white">
            Easy
          </option>
          <option value="medium" className="bg-[#111827] text-white">
            Medium
          </option>
          <option value="hard" className="bg-[#111827] text-white">
            Hard
          </option>
        </select>

        {/* Category */}
        <select
          {...register("category")}
          className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white appearance-none"
        >
          <option value="" className="bg-[#111827] text-white">
            Select Category
          </option>
          <option value="array" className="bg-[#111827] text-white">
            Array
          </option>
          <option value="linkedList" className="bg-[#111827] text-white">
            Linked List
          </option>
          <option value="graph" className="bg-[#111827] text-white">
            Graph
          </option>
          <option value="dp" className="bg-[#111827] text-white">
            DP
          </option>
          <option value="string" className="bg-[#111827] text-white">
            String
          </option>
          <option value="tree" className="bg-[#111827] text-white">
            Tree
          </option>
        </select>

      </div>

      <input
      {...register("companies")}
      placeholder=" Company Tags (Amazon, Google, Microsoft)"
      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        {...register("constraints")}
        placeholder="2 <= nums.length <= 10^4"
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
      {...register("hints")}
      placeholder="Enter hints line by line"
      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />


      <textarea
        {...register("inputFields")}
        placeholder={`Input Fields (one per line)`}
        className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
          

        {/* Visible Test Cases */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Visible Test Cases</h2>

          {visibleFields.map((field, index) => (
            <div key={field.id} className="bg-white/5 p-4 rounded-xl mb-4 space-y-3 border border-white/10">
              
              <textarea
                defaultValue={field.input} 
                placeholder="Input (each value on new line)"
                {...register(`visibleTestCases.${index}.input`)}
                className="w-full p-2 rounded-md bg-white/10 border border-white/20 h-20 resize-none"
              />

              <input
                placeholder="Output"
                {...register(`visibleTestCases.${index}.output`)}
                className="w-full p-2 rounded-md bg-white/10 border border-white/20"
              />

              <input
                placeholder="Explanation"
                {...register(`visibleTestCases.${index}.explanation`)}
                className="w-full p-2 rounded-md bg-white/10 border border-white/20"
              />

              <button
                type="button"
                onClick={() => removeVisible(index)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addVisible({ input: "", output: "", explanation: "" })}
            className="mt-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform duration-200"
          >
            + Add Test Case
          </button>
        </div>

        {/* Hidden Test Cases */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Hidden Test Cases</h2>

          {hiddenFields.map((field, index) => (
            <div key={field.id} className="bg-white/5 p-4 rounded-xl mb-4 space-y-3 border border-white/10">
              
              <textarea
                defaultValue={field.input} 
                placeholder="Input (each value on new line)"
                {...register(`hiddenTestCases.${index}.input`)}
                className="w-full p-2 rounded-md bg-white/10 border border-white/20 h-20 resize-none"
              />

              <input
                placeholder="Output"
                {...register(`hiddenTestCases.${index}.output`)}
                className="w-full p-2 rounded-md bg-white/10 border border-white/20"
              />

              <input
                placeholder="Explanation"
                {...register(`hiddenTestCases.${index}.explanation`)}
                className="w-full p-2 rounded-md bg-white/10 border border-white/20"
              />

              <button
                type="button"
                onClick={() => removeHidden(index)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addHidden({ input: "", output: "", explanation: "" })}
            className="mt-2 px-4 py-2 rounded-lg bg-linear-to-r from-pink-500 to-red-500 hover:scale-105 transition-transform duration-200"
          >
            + Add Hidden Case
          </button>
        </div>

      {/* Function */}
        <input
          placeholder="Function Name (e.g. add)"
          {...register("functionName")}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
        />
        {errors.functionName && (
          <p className="text-red-400">{errors.functionName.message}</p>
        )}

        {/* function signature */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Function Signature</h2>

          {/* C++ */}
          <textarea
            placeholder="int add(int a, int b)"
            {...register("functionSignature.cpp")}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          />

          {/* JavaScript */}
          <textarea
            placeholder="function add(a, b)"
            {...register("functionSignature.javascript")}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          />

          {/* Java */}
          <textarea
            placeholder="public static int add(int a, int b)"
            {...register("functionSignature.java")}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          />
        </div>

        {/* Starter Code */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Starter Code</h2>

          <textarea
            placeholder="C++ Code"
            {...register("startCode.0.boilerCode")}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          />

          <textarea
            placeholder="Java Code"
            {...register("startCode.1.boilerCode")}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          />

          <textarea
            placeholder="JavaScript Code"
            {...register("startCode.2.boilerCode")}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          />
        </div>

        {/* Reference Solution */}
        <div className="space-y-4">
        <h2 className="text-xl font-semibold">Reference Solution (Admin Only)</h2>

        {/* C++ */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <label className="text-sm text-gray-300">C++ Solution</label>
            <textarea
            placeholder="Write C++ optimal solution..."
            {...register("refSolution.0.completeCode")}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 min-h-30"
            />
        </div>

        {/* Java */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <label className="text-sm text-gray-300">Java Solution</label>
            <textarea
            placeholder="Write Java optimal solution..."
            {...register("refSolution.1.completeCode")}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 min-h-30"
            />
        </div>

        {/* JavaScript */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <label className="text-sm text-gray-300">JavaScript Solution</label>
            <textarea
            placeholder="Write JS optimal solution..."
            {...register("refSolution.2.completeCode")}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 min-h-30"
            />
        </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-linear-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02]"
        >
          Submit Problem 
        </button>

      </form>
    </div>
  </div>
  </div>
</MainLayout> 
    )
}