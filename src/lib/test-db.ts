import { createBrowserClient } from '@supabase/ssr'

export async function testDatabaseConnection() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    if (error) {
      console.error('Database connection test failed:', error)
      return { success: false, error }
    }

    console.log('Database connection test successful:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Database connection test error:', error)
    return { success: false, error }
  }
}

export async function testTablesExist() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const tables = ['users', 'shipments', 'tracking_events', 'admin_updates']
  const results: { [key: string]: boolean } = {}

  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1)

      results[table] = !error
      if (error) {
        console.error(`Table ${table} test failed:`, error)
      }
    } catch (error) {
      console.error(`Table ${table} test error:`, error)
      results[table] = false
    }
  }

  return results
}
