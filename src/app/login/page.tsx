import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { UserAuthForm } from "@/components/auth/user-auth-form"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Rocket } from "lucide-react"

export default function LoginPage() {
    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-2">
                    <ModeToggle />
                    <Link
                        href="/signup"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                        )}
                    >
                        회원가입
                    </Link>
                </div>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Rocket className="mr-2 h-6 w-6 text-orange-500" />
                        Park Seon-Young
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;이 프로젝트 도구를 사용하고 나서 업무 효율이 200% 증가했습니다.
                                박선영 본부장님의 꼼꼼한 관리 덕분에 혼자서도 큰 프로젝트를
                                무리 없이 진행할 수 있었어요.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis / 인디 개발자</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        {/* Mobile Logo View */}
                        <div className="flex flex-col items-center space-y-2 lg:hidden mb-10">
                            <Rocket className="h-10 w-10 text-orange-500" />
                            <h1 className="text-xl font-bold">Park Seon-Young</h1>
                        </div>

                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                로그인
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                이메일과 비밀번호를 입력하여 로그인하세요.
                            </p>
                        </div>
                        <UserAuthForm mode="login" />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            <Link
                                href="/register"
                                className="hover:text-brand underline underline-offset-4"
                            >
                                계정이 없으신가요? 회원가입
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
