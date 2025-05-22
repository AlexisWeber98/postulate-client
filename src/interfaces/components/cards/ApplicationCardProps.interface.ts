export interface Application {
  company: string
  position: string
  status: string
  notes?: string
}

export interface ApplicationCardProps {
  application: Application
  formattedDate: string
  getInitials: (companyName: string) => string
  getStatusLabel: (status: string) => string
  handleEdit: () => void
  openDeleteModal: () => void
  closeDeleteModal: () => void
  confirmDelete: () => void
  isDeleteModalOpen: boolean
}
