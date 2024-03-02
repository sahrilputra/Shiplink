export function isSuperuser(session) {
    return session?.user?.type === 'superadmin';
}