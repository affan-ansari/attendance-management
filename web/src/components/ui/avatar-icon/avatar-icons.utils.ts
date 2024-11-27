export const getInitials = (name: string) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    const initials = names.map((n) => n[0].toUpperCase()).join("");
    return initials.slice(0, 2);
};
