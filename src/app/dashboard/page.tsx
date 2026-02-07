import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { logout } from '../auth/actions'
import { getProjects } from './actions'
import { ProjectCreateDialog } from '@/components/project-create-dialog'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    // Fetch profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    // Fetch projects
    const projects = await getProjects()

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">대시보드</h1>
                <div className="flex gap-2">
                    <ProjectCreateDialog />
                    <form action={logout}>
                        <Button variant="outline">로그아웃</Button>
                    </form>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>내 프로필</CardTitle>
                        <CardDescription>{profile?.full_name || '이름 없음'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            이메일: {user.email}
                        </p>
                    </CardContent>
                </Card>

                {/* Project List */}
                {projects.map((project) => (
                    <Card key={project.id}>
                        <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>{new Date(project.created_at).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{project.description || '설명 없음'}</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={`/dashboard/projects/${project.id}`} className="w-full">
                                <Button variant="secondary" size="sm" className="w-full">관리</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}

                {projects.length === 0 && (
                    <Card className="border-dashed bg-muted/50 flex flex-col items-center justify-center p-6 text-center">
                        <CardContent className="pt-6">
                            <div className="text-xl font-semibold text-muted-foreground mb-2">프로젝트가 없습니다</div>
                            <p className="text-sm text-muted-foreground mb-4">새로운 아이디어를 실현해보세요!</p>
                            <ProjectCreateDialog />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
