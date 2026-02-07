'use client'

import { createTask } from '@/app/dashboard/actions'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from 'react'

export function TaskCreateDialog({ projectId }: { projectId: string }) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">할 일 추가</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>새로운 할 일</DialogTitle>
                    <DialogDescription>
                        할 일의 내용을 입력하세요.
                    </DialogDescription>
                </DialogHeader>
                <form action={async (formData) => {
                    await createTask(formData)
                    setOpen(false)
                }}>
                    <input type="hidden" name="projectId" value={projectId} />
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                제목
                            </Label>
                            <Input id="title" name="title" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                상태
                            </Label>
                            <div className="col-span-3">
                                <Select name="status" defaultValue="todo">
                                    <SelectTrigger>
                                        <SelectValue placeholder="상태 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todo">할 일 (Todo)</SelectItem>
                                        <SelectItem value="in_progress">진행 중 (In Progress)</SelectItem>
                                        <SelectItem value="done">완료 (Done)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                설명
                            </Label>
                            <Textarea id="description" name="description" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">추가하기</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
