import { AiOutlineGlobal } from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from 'src/services/auth.service'
import { useAppContext } from 'src/contexts/app.context'
import { Avatar, Button, Popover } from 'src/components/shared'
import { path } from 'src/constants'
import { purchasesStatus } from 'src/constants/purchase'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function NavHeader() {
  const { setIsAuthenticated, isAuthenticated, setProfile } = useAppContext()

  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      toast.success('Logout successfully')
      queryClient.removeQueries({
        queryKey: ['purchase', purchasesStatus.inCart]
      })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='flex items-center justify-end space-x-4 py-2'>
      {/* language switcher */}
      <Popover
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col py-2 pl-3 pr-28'>
              <button className='hover:text-primary px-3 py-2 text-left'>Tiếng Việt</button>
              <button className='hover:text-primary mt-2 px-3 py-2 text-left'>English</button>
            </div>
          </div>
        }
      >
        <Button secondary RightIcon={BsChevronDown} LeftIcon={AiOutlineGlobal} className='text-white/80'>
          Tiếng Việt
        </Button>
      </Popover>

      {/* user */}
      {isAuthenticated ? (
        <Popover
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={path.profile}
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Tài khoản của tôi
              </Link>
              <Link
                to={path.purchase}
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <Button secondary>
            <Avatar />
          </Button>
        </Popover>
      ) : (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='border-r-[1px] border-r-white/40' />
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavHeader
