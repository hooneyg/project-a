import { createClient } from '@/utils/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { getProject, getTasks, updateTaskStatus } from '../../actions'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ArrowLeft, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { TaskCreateDialog } from '@/components/task-create-dialog'
import { Badge } from '@/components/ui/badge'

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    const project = await getProject(id)

    if (!project) {
        notFound()
    }

    const tasks = await getTasks(id)

    const todoTasks = tasks.filter((task: any) => task.status === 'todo')
    const inProgressTasks = tasks.filter((task: any) => task.status === 'in_progress')
    const doneTasks = tasks.filter((task: any) => task.status === 'done')

    return (
        <div className="container mx-auto py-10 h-screen flex flex-col">
            <div className="mb-8 flex-shrink-0">
                <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        대시보드로 돌아가기
                    </Link>
                </Button>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
                        <p className="text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex gap-2">
                        <TaskCreateDialog projectId={project.id} />
                    </div>
                </div>
            </div>

            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden min-h-0">
                {/* Todo Column */}
                <div className="flex flex-col h-full bg-secondary/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        할 일 (Todo)
                        <Badge variant="secondary">{todoTasks.length}</Badge>
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {todoTasks.map((task: any) => (
                            <TaskCard key={task.id} task={task} projectId={project.id} />
                        ))}
                        {todoTasks.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                                할 일이 없습니다.
                            </div>
                        )}
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="flex flex-col h-full bg-secondary/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-blue-600">
                        진행 중 (In Progress)
                        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">{inProgressTasks.length}</Badge>
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {inProgressTasks.map((task: any) => (
                            <TaskCard key={task.id} task={task} projectId={project.id} />
                        ))}
                        {inProgressTasks.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                                진행 중인 일이 없습니다.
                            </div>
                        )}
                    </div>
                </div>

                {/* Done Column */}
                <div className="flex flex-col h-full bg-secondary/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-600">
                        완료 (Done)
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">{doneTasks.length}</Badge>
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {doneTasks.map((task: any) => (
                            <TaskCard key={task.id} task={task} projectId={project.id} />
                        ))}
                        {doneTasks.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                                완료된 일이 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function TaskCard({ task, projectId }: { task: any, projectId: string }) {
    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base font-medium">{task.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
            </CardContent>
            <CardFooter className="p-2 flex justify-end gap-1">
                {task.status !== 'todo' && (
                    <form action={async () => {
                        'use server'
                        await updateTaskStatus(task.id, 'todo', projectId)
                    }}>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">Todo</Button>
                    </form>
                )}
                {task.status !== 'in_progress' && (
                    <form action={async () => {
                        'use server'
                        await updateTaskStatus(task.id, 'in_progress', projectId)
                    }}>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">진행</Button>
                    </form>
                )}
                {task.status !== 'done' && (
                    <form action={async () => {
                        'use server'
                        await updateTaskStatus(task.id, 'done', projectId)
                    }}>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">완료</Button>
                    </form>
                )}
            </CardFooter>
        </Card>
    )
}
