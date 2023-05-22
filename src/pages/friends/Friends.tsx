import { Button, Navbar, PageHeader } from '../../shared/components';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getAuthHeader } from '../../shared/services/auth';
import { api } from '../../shared/services/api';
import { User } from '../../models/User';
import { UserCircle } from '@phosphor-icons/react';

export const Friends = () => {
  const [followingList, setFollowingList] = useState<User[]>([]);

  const authHeader = getAuthHeader();

  const getFollowing = async (userId: string, userName: string) => {
    try {
      await api.post('/profiles/' + userId + '/follow', authHeader);
      toast.success(`Agora você segue o/a ${userName}`);
    } catch (error) {
      toast.error(`Erro ao seguir o ${userName}!`);
    }
  };

  useEffect(() => {
    const getFriendsToFollow = async () => {
      try {
        const currentUserId = localStorage.getItem('profile');

        const { data } = await api.get('/profiles', authHeader);
        const filteredUsers = data.filter((user: User) => {
          if (user._id === currentUserId) {
            return false;
          }
          if (currentUserId != null) {
            if (user.followers.includes(currentUserId)) {
              return false;
            }
          }
          return true;
        });
        setFollowingList(filteredUsers);
      } catch (e: unknown) {
        toast.error('Erro ao atualizar os perfis!');
      }
    };
    getFriendsToFollow();
  }, []);

  return (
    <>
      <Navbar />
      <PageHeader title='Amigos' className='mt-8' />
      {followingList.map((user) => (
        <div key={user._id} className='ml-[283px] mb-4'>
          <div className='flex items-center gap-[6px] ml-5 mb-[6px]'>
            <UserCircle size={64} weight='fill' className='text-gray-100' />
            <span className='text-2xl font-bold text-white'>{user.name}</span>
          </div>
          <div className='flex flex-col gap-2 mb-5'>
            <span className='text-sm text-white font-normal ml-7'>
              {user.followers.length + ' Seguidores'}
            </span>
            <span className='text-sm text-white font-normal ml-7'>
              {'Seguindo ' + user.following.length}
            </span>
          </div>
          <Button
            onClick={() => getFollowing(user._id, user.name)}
            text='Seguir'
            className='w-80 ml-[27px] mb-8'
          />
          <hr className='border-b border-secondary' />
        </div>
      ))}
      <ToastContainer />
    </>
  );
};