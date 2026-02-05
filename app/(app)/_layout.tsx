import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function AppLayout() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/(auth)/login");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.replace("/(auth)/login");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="notes"
        options={{
          title: "My Notes",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="note/[id]"
        options={{
          title: "Note",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
