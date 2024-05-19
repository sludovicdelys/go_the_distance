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
    if (name === 'username') {
      setFormData(prevData => ({
        ...prevData,
        user: { ...prevData.user, username: value }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string | null } = {};
    if (!formData.type) newErrors.type = 'Run Type is required';
    if (!formData.average_speed) newErrors.average_speed = 'Average Speed is required';
    if (!formData.running_pace) newErrors.running_pace = 'Running Pace is required';
    if (!formData.start_date) newErrors.start_date = 'Start Date is required';
    if (!formData.start_time) newErrors.start_time = 'Start Time is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.distance) newErrors.distance = 'Distance is required';
    if (!formData.user?.username) newErrors.username = 'Username is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createRun(formData);
      // Redirect to the main page or a success page
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
                <label htmlFor="average_speed" className="block text-gray-700 text-sm font-bold mb-2">Average Speed:</label>
                <input
                  type="number"
                  id="average_speed"
                  name="average_speed"
                  value={formData.average_speed || ''}
                  onChange={handleChange}
                  placeholder="Average Speed"
                  className={`w-full px-4 py-2 border rounded-md ${errors.average_speed ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.average_speed}
                  aria-describedby={errors.average_speed ? 'average_speed-error' : undefined}
                />
                {errors.average_speed && <p id="average_speed-error" className="text-red-500 text-sm mt-1">{errors.average_speed}</p>}
              </div>
              <div>
                <label htmlFor="running_pace" className="block text-gray-700 text-sm font-bold mb-2">Running Pace:</label>
                <input
                  type="time"
                  id="running_pace"
                  name="running_pace"
                  value={formData.running_pace || ''}
                  onChange={handleChange}
                  placeholder="Average Speed"
                  className={`w-full px-4 py-2 border rounded-md ${errors.running_pace ? 'border-red-500' : ''}`}
                  aria-invalid={!!errors.running_pace}
                  aria-describedby={errors.running_pace ? 'running_pace-error' : undefined}
                />
                {errors.running_pace && <p id="running_pace-error" className="text-red-500 text-sm mt-1">{errors.running_pace}</p>}
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
                  value={formData.start_time || ''}
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