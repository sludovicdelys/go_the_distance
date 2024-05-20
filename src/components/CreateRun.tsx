"use client";
import { useState } from 'react';
import { createRun, Run } from '../app/services/apiService';

const CreateRun: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Run>>({
    type: '',
    average_speed: 0,
    running_pace: '',
    start_date: '',
    start_time: '',
    time: '',
    distance: 0,
    comments: '',
    user: { username: '' },
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let valueisInt = false; 

    if (name === 'distance' || name === 'average_speed' || name === 'running_pace' || name === 'time' || name === 'start_time')
    {
      valueisInt = true
    }

    if (name === 'username') {
      setFormData(prevData => ({
        ...prevData,
        user: { ...prevData.user, username: value }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: !valueisInt ? value : parseInt(value),

      }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string | null } = {};
    if (!formData.type) newErrors.type = 'Run Type is required';
    if (!formData.start_date) newErrors.start_date = 'Start Date is required';
    if (!formData.start_time) newErrors.start_time = 'Start Time is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.distance) newErrors.distance = 'Distance is required';
    if (!formData.user?.username) newErrors.username = 'Username is required';
    return newErrors;
  };

  const calculateAverageSpeed = (distance: number, time: string) => {
    const timeParts = time.split(':').map(Number);
    const timeInHours = timeParts[0] + timeParts[1] / 60 + timeParts[2] / 3600;
    return distance / timeInHours;
  };

  const calculateRunningPace = (distance: number, time: string) => {
    const timeParts = time.split(':').map(Number);
    const timeInHours = timeParts[0] + timeParts[1] / 60 + timeParts[2] / 3600;
    const runningPaceInMinutes = timeInHours / distance * 60;
    const runningPaceHours = Math.floor(runningPaceInMinutes / 60);
    const runningPaceMinutes = Math.floor(runningPaceInMinutes % 60);
    const runningPaceSeconds = Math.round((runningPaceInMinutes - Math.floor(runningPaceInMinutes)) * 60);
    return `${runningPaceHours.toString().padStart(2, '0')}:${runningPaceMinutes.toString().padStart(2, '0')}:${runningPaceSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!formData.time || !formData.distance) {
      setError('Time and Distance are required');
      return;
    }

    const average_speed = calculateAverageSpeed(formData.distance, formData.time);
    const running_pace = calculateRunningPace(formData.distance, formData.time);

    const finalData = {
      ...formData,
      average_speed: parseFloat(average_speed.toFixed(2)),
      running_pace,
      start_date: formData.start_date ? new Date(formData.start_date).toISOString().split('T')[0] : '',
      start_time: formData.start_time,
      time: formData.time,
    };

    console.log(finalData);
    try {
      await createRun(finalData);
      window.location.href = '/';
    } catch (error) {
      setError('Error creating run');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <section className="w-full max-w-2xl mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-10">Create Run</h2>
          <div className="mb-8">
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.user?.username || ''}
                  onChange={handleChange}
                  placeholder="Username"
                  className={`w-full px-4 py-2 border rounded-md ${errors.username ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.username}
                  aria-describedby={errors.username ? 'username-error' : undefined}
                />
                {errors.username && <p id="username-error" className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Run Type:</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type || ''}
                  onChange={handleChange}
                  placeholder="Run Type"
                  className={`w-full px-4 py-2 border rounded-md ${errors.type ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.type}
                  aria-describedby={errors.type ? 'type-error' : undefined}
                />
                {errors.type && <p id="type-error" className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>
              <div>
                <label htmlFor="start_date" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date ? new Date(formData.start_date).toISOString().split('T')[0] : ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${errors.start_date ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.start_date}
                  aria-describedby={errors.start_date ? 'start_date-error' : undefined}
                />
                {errors.start_date && <p id="start_date-error" className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
              </div>
              <div>
                <label htmlFor="start_time" className="block text-gray-700 text-sm font-bold mb-2">Start Time:</label>
                <input
                  type="time"
                  id="start_time"
                  name="start_time"
                  value={formData.time || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${errors.start_time ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.start_time}
                  aria-describedby={errors.start_time ? 'start_time-error' : undefined}
                />
                {errors.start_time && <p id="start_time-error" className="text-red-500 text-sm mt-1">{errors.start_time}</p>}
              </div>
              <div>
                <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Time:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md ${errors.time ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.time}
                  aria-describedby={errors.time ? 'time-error' : undefined}
                />
                {errors.time && <p id="time-error" className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
              <div>
                <label htmlFor="distance" className="block text-gray-700 text-sm font-bold mb-2">Distance:</label>
                <input
                  type="number"
                  id="distance"
                  name="distance"
                  value={formData.distance || ''}
                  onChange={handleChange}
                  placeholder="Distance"
                  className={`w-full px-4 py-2 border rounded-md ${errors.distance ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.distance}
                  aria-describedby={errors.distance ? 'distance-error' : undefined}
                />
                {errors.distance && <p id="distance-error" className="text-red-500 text-sm mt-1">{errors.distance}</p>}
              </div>
              <div>
                <label htmlFor="comments" className="block text-gray-700 text-sm font-bold mb-2">Comments:</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments || ''}
                  onChange={handleChange}
                  placeholder="Comments"
                  className="w-full px-4 py-2 border rounded-md"
                  aria-label="Comments"
                />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Create</button>
              {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreateRun;