import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store';
import { handleError } from '@/utils/handleError';
import { useLogoutMutation } from '@/redux/slices/api';
import { updateCurrentUser, updateIsLoggedIn } from '@/redux/slices/appSlice';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


function Header() {
  const [logout, {isLoading}] = useLogoutMutation();
  const isLoggedIn = useSelector((state:RootState)=> state.appSlice.isLoggedIn);
  const dispatch = useDispatch();
  const currentUser = useSelector((state:RootState)=> state.appSlice.currentUser);

  async function handlerLogout(){
    try {
      await logout().unwrap();

    } catch (error) {
      handleError(error);
      dispatch(updateIsLoggedIn(false));
      dispatch(updateCurrentUser({}));
    }
  }
  return (
    <nav className='w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center'>
     
     <Link to="/"><h2 className='font-bold select-none'> WD Compiler</h2></Link>
     <ul className='flex gap-2 '>
      <li>
        <Link to="/compiler"><Button  variant="outline">Compiler</Button></Link>
      </li>
      {
        isLoggedIn ?
          <>
            <li>
              <Link to="/login"><Button loading={isLoading} onClick={handlerLogout} variant="destructive">Logout</Button></Link>
            </li>
            <li>
            <Avatar>
              <AvatarImage src={currentUser.picture} />
              <AvatarFallback className='capitalize'>
                {currentUser.username?.slice(0,2)}
              </AvatarFallback>
            </Avatar>
            </li>
          </> : 
         <>
            <li>
                <Link to="/login"><Button variant="blue">Login</Button></Link>
            </li>
            <li>
                <Link to="/signup"><Button variant="blue">Signup</Button></Link>
            </li>
         </>
      }
            
     </ul>
    </nav>
  )
}

export default Header