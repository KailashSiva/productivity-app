import React from 'react'
import { Select } from '@radix-ui/react-select'


export default function SelectProperty({ onValueChange }) {
    return (
        <Select.Root onValueChange={onValueChange}>
            <Select.Trigger>…</Select.Trigger>
            <Select.Portal>
                <Select.Content>
                    <Select.Viewport>
                        <Select.Item disabled>
                            …
                        </Select.Item>
                        <Select.Item>…</Select.Item>
                        <Select.Item>…</Select.Item>
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>

    )
}
