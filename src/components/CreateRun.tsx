"use client";
import { useState } from 'react';
import { createRun, Run } from '../app/services/apiService';

const CreateRun: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Run>>({
    type: '',
    start_date: '',
    start_time: '00:00:00',
    time: '00:00:00',
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
    } else if (name.endsWith('_hour') || name.endsWith('_minute')) {
      // Handle hour and minute inputs
      let nameParts = name.split('_');
      let timePart = nameParts.pop() as string; // 'hour' or 'minute'
      let timeField = nameParts.join('_'); // 'start_time' or 'time'
      let timeValue = (formData[timeField as keyof typeof formData] || '00:00:00') as string;
      let timeParts = timeValue.split(':'); // Split the time value into hours and minutes

      if (timePart === 'hour') {
        timeParts[0] = value.padStart(2, '0');
      } else if (timePart === 'minute') {
        timeParts[1] = value.padStart(2, '0');
      }

      // Update the time field with the new hours and minutes
      setFormData(prevData => ({
        ...prevData,
        [timeField]: `${timeParts[0]}:${timeParts[1]}:00`,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: (name === 'distance') ? parseInt(value) : value,
      }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string | null } = {};
    if (!formData.type) newErrors.type = 'Run Type is required';
    if (!formData.start_date) newErrors.start_date = 'Start Date is required';
    if (formData.start_time === '00:00') newErrors.start_time = 'Start Time is required';
    if (formData.time === '00:00') newErrors.time = 'Time is required';
    if (!formData.distance) newErrors.distance = 'Distance is required';
    if (!formData.user?.username) newErrors.username = 'Username is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Submit button clicked'); 
    console.log('Before handleSubmit:', formData);
    e.preventDefault();
    console.log('Has required data'); // Add this line

    const newErrors = validate();
    console.log('Validation errors:', newErrors); 
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Passed validation');
  
    if (!formData.time || !formData.distance) {
      setError('Time and Distance are required');
      return;
    }

    console.log('Has required data');

  
    const finalData = {
      ...formData,
      start_date: formData.start_date ? new Date(formData.start_date).toISOString().split('T')[0] : '',
      start_time: formData.start_time ? `${formData.start_time}` : '',
      time: formData.time ? `${formData.time}` : '',
    };

    console.log('Final data:', finalData);
  
    try {
      await createRun(finalData);
      // Use your routing library's navigation function here
    } catch (error : any) {
      console.error(error); // Log the error to the console
      setError(error.message || 'Error creating run');
    }

    // Log formData after submit
    console.log('After handleSubmit:', formData);
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
              <fieldset className="mb-4 p-4 border rounded-lg bg-gray-50">
                <legend className="text-lg font-semibold text-gray-700 mb-2">Start Time</legend>
                <div className="flex items-center space-x-2 mb-2" >
                  <label htmlFor="start_time_hour" className="text-gray-700">Hour:</label>
                  <input
                    type="number"
                    id="start_time_hour"
                    name="start_time_hour"
                    min="0"
                    max="23"
                    onChange={handleChange}
                    aria-label="Start time hour"
                    className="w-16 px-2 py-1 border rounded-md"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="start_time_minute" className="text-gray-700">Minute:</label>
                  <input
                    type="number"
                    id="start_time_minute"
                    name="start_time_minute"
                    min="0"
                    max="59"
                    onChange={handleChange}
                    aria-label="Start time minute"
                    className="w-16 px-2 py-1 border rounded-md"
                  />
                </div>
              </fieldset>
              <fieldset className="mb-4 p-4 border rounded-lg bg-gray-50">
                <legend className="text-lg font-semibold text-gray-700 mb-2">Time</legend>
                <div className="flex items-center space-x-2 mb-2">
                  <label htmlFor="time_hour" className="text-gray-700">Hour:</label>
                  <input
                    type="number"
                    id="time_hour"
                    name="time_hour"
                    min="0"
                    max="23"
                    onChange={handleChange}
                    aria-label="time hour"
                    className="w-16 px-2 py-1 border rounded-md"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label htmlFor="time_minute" className="text-gray-700">Minute:</label>
                  <input
                    type="number"
                    id="time_minute"
                    name="time_minute"
                    min="0"
                    max="59"
                    onChange={handleChange}
                    aria-label="time minute"
                    className="w-16 px-2 py-1 border rounded-md"
                  />
                </div>
              </fieldset>
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