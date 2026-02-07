'use client'

import { createProject } from '@/app/dashboard/actions'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'

export function ProjectCreateDialog() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ 새 프로젝트</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>프로젝트 생성</DialogTitle>
                    <DialogDescription>
                        새로운 프로젝트의 기본 정보를 입력하세요.
                    </DialogDescription>
                </DialogHeader>
                <form action={async (formData) => {
                    await createProject(formData)
                    setOpen(false)
                }}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                이름
                            </Label>
                            <Input id="name" name="name" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                설명
                            </Label>
                            <Textarea id="description" name="description" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">만들기</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
