import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux_store/store";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../../redux_store/features/auth";

export const LoginPage = (): ReactNode => {
    const dispatch = useDispatch<AppDispatch>();
    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { loading } = useSelector((state: RootState) => state.auth)
    
    const handleSubmit = () => {
        dispatch(loginUserThunk({username, password}))
    }

    return (
    <div className={`flex justify-center items-center h-[90vh] w-full`}>
      <div
        className={`border-1 border-ter-1000 px-40 py-20 bg-ter-750 rounded-lg ${loading?'blur-2xl':''}`}
      >
        <form className="max-w-sm mx-auto text-center">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={username}
              onChange={(e)=>setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <div
            // type="submit"
            className="text-white bg-pri-750 hover:bg-pri-1000 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            onClick={handleSubmit}            
          >
            Submit
          </div>
        </form>
      </div>
    </div>
  );
};
