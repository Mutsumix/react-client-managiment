import { useEffect, useState } from 'react'
import { Client, ClientInput } from './types/client'
import { ClientForm } from './components/ClientForm'
import { supabase } from './api/supabase'

function App() {
  const [clients, setClients] = useState<Client[]>([])
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching clients:', error)
      return
    }

    setClients(data)
  }

  const handleCreate = async (data: ClientInput) => {
    console.log('Attempting to create:', data);
    const { error } = await supabase
      .from('clients')
      .insert([data])

    if (error) {
      console.error('Error creating client:', error)
      return
    }

    fetchClients()
  }

  const handleUpdate = async (data: ClientInput) => {
    if (!editingClient) return

    const { error } = await supabase
      .from('clients')
      .update(data)
      .eq('id', editingClient.id)

    if (error) {
      console.error('Error updating client:', error)
      return
    }

    setEditingClient(null)
    fetchClients()
  }

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting client:', error)
      return
    }

    fetchClients()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">取引先管理システム</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {editingClient ? '取引先を編集' : '新規登録'}
              </h2>
              <ClientForm
                onSubmit={editingClient ? handleUpdate : handleCreate}
                initialData={editingClient}
              />
              {editingClient && (
                <button
                  onClick={() => setEditingClient(null)}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                >
                  キャンセルして新規登録に戻る
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">取引先一覧</h2>
            <div className="space-y-4">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{client.company_name}</h3>
                      <p className="text-yellow-500 my-1">
                        {'★'.repeat(client.importance)}
                        <span className="text-gray-300">{'★'.repeat(3 - client.importance)}</span>
                      </p>
                      <p className="text-sm text-gray-600">担当者: {client.contact_person}</p>
                      {client.notes && (
                        <p className="text-sm text-gray-500 mt-2">{client.notes}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingClient(client)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
