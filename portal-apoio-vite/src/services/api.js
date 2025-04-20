export const submitForm = async (formData) => {
  try {
    const response = await fetch('/api/submit_form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Erro ao enviar formulário: ' + error.message);
  }
}; 