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

// Valida todos los campos del formulario
 
const validateForm = () => {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const jobTitle = document.getElementById('jobTitle');
    const terms = document.getElementById('terms');
    
    let isValid = true;
    
    // Validar nombre completo (no vacío y mínimo 3 caracteres)
    if (fullName.value.trim() === '' || fullName.value.trim().length < 3) {
        fullName.setCustomValidity('El nombre debe tener al menos 3 caracteres');
        isValid = false;
    } else {
        fullName.setCustomValidity('');
    }
    
    // Validar email (formato correcto)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.setCustomValidity('Ingresa un email válido');
        isValid = false;
    } else {
        email.setCustomValidity('');
    }
    
    // Validar cargo (no vacío)
    if (jobTitle.value.trim() === '') {
        jobTitle.setCustomValidity('El cargo es requerido');
        isValid = false;
    } else {
        jobTitle.setCustomValidity('');
    }
    
    // Validar términos y condiciones
    if (!terms.checked) {
        terms.setCustomValidity('Debes aceptar los términos');
        isValid = false;
    } else {
        terms.setCustomValidity('');
    }
    
    return isValid;
};