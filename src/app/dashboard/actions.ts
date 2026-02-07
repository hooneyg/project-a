'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
        redirect('/login')
    }

    const name = formData.get('name') as string
    const description = formData.get('description') as string

    const { error } = await supabase
        .from('projects')
        .insert({
            user_id: user.id,
            name,
            description,
        })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/dashboard')
}

export async function getProjects() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching projects:', error)
        return []
    }

    return projects
}

export async function getProject(id: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching project:', error)
        return null
    }


    return project
}

export async function createTask(formData: FormData) {
    const supabase = await createClient()

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
        redirect('/login')
    }

    const projectId = formData.get('projectId') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const status = formData.get('status') as string || 'todo'

    const { error } = await supabase
        .from('tasks')
        .insert({
            user_id: user.id,
            project_id: projectId,
            title,
            description,
            status
        })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath(`/dashboard/projects/${projectId}`)
}

export async function getTasks(projectId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching tasks:', error)
        return []
    }

    return tasks
}

export async function updateTaskStatus(taskId: string, status: string, projectId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('tasks')
        .update({ status })
        .eq('id', taskId)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath(`/dashboard/projects/${projectId}`)
}
