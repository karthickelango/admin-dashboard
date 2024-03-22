import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext({})
export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setIsloading] = useState(true)
    // fetch auth
    const fetchSession = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        if (session) {
            try {
                // fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
            } catch (error) {
                console.log(error)
            }
        }
        setIsloading(false)
    } 

    useEffect(() => {
        fetchSession()
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ session, loading, profile }}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthContext
