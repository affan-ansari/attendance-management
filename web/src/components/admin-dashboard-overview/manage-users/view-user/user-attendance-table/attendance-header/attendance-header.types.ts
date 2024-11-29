export interface IAttendanceHeaderProps {
    selectedStatus: string;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setSelectedStatus: React.Dispatch<React.SetStateAction<string>>;
}
