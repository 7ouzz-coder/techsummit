document.addEventListener('DOMContentLoaded', () => {
    // Obtener el formulario
    const form = document.getElementById('registrationForm');
    
    // Escuchar el evento submit
    form.addEventListener('submit', (event) => {
        // Prevenir el envío por defecto
        event.preventDefault();
        event.stopPropagation();
        
        // Limpiar mensajes anteriores
        clearMessages();
        
        // Validar el formulario
        if (validateForm()) {
            // Si es válido, mostrar mensajes de éxito (innerHTML + Modal)
            showSuccessModal();
            // Reset del formulario
            form.reset();
            form.classList.remove('was-validated');
        } else {
            // Agregar clase de Bootstrap para mostrar errores
            form.classList.add('was-validated');
            // Mostrar mensaje de error con innerHTML
            showErrorMessage();
        }
    });
    
    // Smooth scroll para los enlaces del navbar
    initSmoothScroll();
});