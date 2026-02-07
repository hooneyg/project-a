import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { UserAuthForm } from "@/components/auth/user-auth-form"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Rocket } from "lucide-react"

export default function SignupPage() {
    return (
        <>
            <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-2">
                    <ModeToggle />
                    <Link
                        href="/login"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                        )}
                    >
                        로그인
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
                                &ldquo;망설이지 말고 시작하세요.
                                박선영 본부장이 제공하는 AI 자동화 시스템은
                                초기 스타트업에게 필수적인 요소입니다.&rdquo;
                            </p>
                            <footer className="text-sm">James Kim / 스타트업 CEO</footer>
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
                                계정 만들기
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                이메일을 입력하여 새로운 계정을 생성하세요.
                            </p>
                        </div>
                        <UserAuthForm mode="signup" />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            계 속 진행함으로써, 귀하는 당사의{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                이용약관
                            </Link>{" "}
                            및{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                개인정보 처리방침
                            </Link>
                            에 동의하게 됩니다.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
