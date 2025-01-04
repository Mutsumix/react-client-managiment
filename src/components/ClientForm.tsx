import { useForm } from 'react-hook-form'
import { ClientInput } from '../types/client'

type Props = {
  onSubmit: (data: ClientInput) => void
  initialData?: ClientInput
}

export const ClientForm = ({ onSubmit, initialData }: Props) => {
  const { register, handleSubmit } = useForm<ClientInput>({
    defaultValues: initialData
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto space-y-6">
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">社名</label>
        <input
          {...register('company_name')}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">重要度</label>
        <select
          {...register('importance')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value={1}>★</option>
          <option value={2}>★★</option>
          <option value={3}>★★★</option>
        </select>
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">担当者名</label>
        <input
          {...register('contact_person')}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">備考</label>
        <textarea
          {...register('notes')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          保存
        </button>
      </div>
    </form>
  )
}
