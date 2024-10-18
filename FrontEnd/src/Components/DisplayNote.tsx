import React from 'react'

interface Note {
    _id: string; 
    title: string;
    description: string;
    category: string;
}

interface DisplayNoteProps {
    note: Note;
}

const DisplayNote: React.FC<DisplayNoteProps> = ({ note }) => {
    return (
        <div className='flex justify-end'>
            <div className='w-[1200px] h-full bg-gray-800'>
                <div className='pt-[50px] pl-[50px]'>
                    <h1 className='text-6xl text-[#009378] font-mono font-semibold'>{note.title}</h1>
                </div>
                <div className='flex justify-center pt-4 pb-4'>
                    <div className='w-[1100px] rounded-xl bg-[#0f856f]'>
                        <p className='p-5 text-white text-md font-mono'>
                            {note.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayNote