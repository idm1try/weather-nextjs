'use client'

import { formatTemperature, formatTime } from '@/lib/formatters'
import useWeather from '@/lib/useWeather'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const Weather = () => {
  const { isLoading, weather, forecast, location, setLocation } = useWeather()

  return (
    <div>
      <input
        aria-label='Enter city'
        placeholder='Enter city'
        type='text'
        spellCheck='false'
        value={location}
        onChange={event => setLocation(event.target.value)}
        className={cn(
          'rounded-md border border-surface0 bg-base',
          'py-2 px-4 capitalize shadow-sm',
          'outline-none transition-colors duration-300',
          'placeholder:text-overlay0 hover:border-surface1',
          'focus:text-text focus:border-surface2',
        )}
      />
      {!isLoading && !weather.message && weather.cod !== '404' && (
        <div>
          <div className='mt-6'>
            <h2 className='text-xl font-bold capitalize'>
              {weather.weather[0].description}
            </h2>
            <h1 className='my-3 text-5xl font-bold'>
              {formatTemperature(weather.main.temp)}
            </h1>
            {formatTemperature(weather.main.feels_like)
                !== formatTemperature(weather.main.temp) && (
              <p className='mb-5 text-overlay0'>
                Feels Like: {formatTemperature(weather.main.feels_like)}
              </p>
            )}
          </div>
          <ul className='animated-list grid grid-cols-2'>
            <li className='pr-4'>
              <div className='flex flex-col gap-1 py-3 min-[820px]:flex-row min-[820px]:gap-9'>
                <span className='text-overlay0 sm:w-20'>
                  {formatTime(weather.sys.sunrise)}
                </span>
                <span className='font-semibold'>Sunrise</span>
              </div>
            </li>
            <li className='pr-4'>
              <div className='flex flex-col gap-1 py-3 min-[820px]:flex-row min-[820px]:gap-9'>
                <span className='text-overlay0 sm:w-20'>
                  {formatTime(weather.sys.sunset)}
                </span>
                <span className='font-semibold'>Sunset</span>
              </div>
            </li>
            {forecast?.list?.map(forecast => (
              <li
                key={forecast.dt}
                className='pr-4'
              >
                <div className='flex flex-col gap-1 py-3 min-[820px]:flex-row min-[820px]:gap-9'>
                  <span className='text-overlay0 sm:w-20'>
                    {formatTime(forecast.dt)}
                  </span>
                  <span className='font-semibold sm:w-12'>
                    {formatTemperature(forecast.main.temp)}
                  </span>
                  <span className='capitalize'>
                    {forecast.weather[0].description}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Weather
