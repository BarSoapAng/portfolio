"use client";

import { useState } from 'react'

import aphelios from '@assets/aphelios.jpg'
import seven from '@assets/seven.png'
import melt from '@assets/melt.jpg'

import { IoMdPlay, IoMdPause, IoMdSkipForward, IoMdSkipBackward } from "react-icons/io";

const SONGS = [
  { title: 'Puddles', artist: 'Not for Radio', cover: melt },
  { title: '七彩光', artist: '单依纯', cover: seven },
  { title: 'Aphelios, Weapon of the Faithful', artist: 'League of Legends', cover: aphelios },
]

export default function VinylPlayer() {
  const [ curSong, setCurSong ] = useState(0);
  const [ playing, setPlaying ] = useState(false);

  return (
    <div className='w-full border-4 border-black-1 bg-cream-1 p-3 text-black-1'>
      <div className="flex gap-4 items-center">
        {/* Vinyl */}
        <div className="relative w-24 h-24 shrink-0">
          {/* Outer vinyl */}
          <img
            src={SONGS[curSong].cover.src}
            className="absolute inset-0 rounded-full border border-black-1 animate-[spin_5s_linear_infinite]"
            style={{
              animationPlayState: playing ? 'running' : 'paused',
            }}
            alt={SONGS[curSong].title}
          />
          {/* Center Rings */}
          <div className="absolute inset-3 rounded-full border border-black-1/25" />
          <div className="absolute inset-6 rounded-full border border-black-1/25" />
          {/* Center label */}
          <div className="absolute inset-10 rounded-full border border-black-1 bg-cream-2" />
        </div>

        {/* Right content */}
        <div className="flex flex-col flex-1 gap-2">
          {/* Song info */}
          <div>
            <div className="text-sm font-bold">{SONGS[curSong].title}</div>
            <div className="text-xs opacity-80">{SONGS[curSong].artist}</div>
          </div>

          {/* Progress bar */}
          <div className="h-1 rounded-sm border border-black-1">
            <div className="h-full w-1/3 bg-black-1" />
          </div>

          {/* Controls */}
          <div className="flex mx-10 justify-between">
            <button onClick={() => setCurSong((curSong + 1) % SONGS.length)}>
              <IoMdSkipBackward className='h-5 hover:cursor-pointer hover:text-gray-1' />
            </button>
            <button onClick={() => setPlaying(!playing)}>
              {playing ? 
                <IoMdPause className='h-5 hover:cursor-pointer hover:text-gray-1' /> : 
                <IoMdPlay className='h-5 hover:cursor-pointer hover:text-gray-1' />
              }
            </button>
            <button onClick={() => setCurSong((curSong + 1) % SONGS.length)}>
              <IoMdSkipForward className='h-5 hover:cursor-pointer hover:text-gray-1'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
