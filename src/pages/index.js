import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('users').select('*');
    if (error) console.error('Erro ao buscar usuários:', error);
    else setUsers(data);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      const { error } = await supabase.from('users').delete().eq('id', id);
      if (error) console.error('Erro ao excluir usuário:', error);
      else fetchUsers();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Painel Administrativo</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nome</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.nome}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}