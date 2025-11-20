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

// Limpia los mensajes del contenedor

const clearMessages = () => {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = '';
};

// Muestra mensaje de error usando innerHTML

const showErrorMessage = () => {
    const messageContainer = document.getElementById('messageContainer');
    
    // Crear el HTML del mensaje de error con Bootstrap Alert
    messageContainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <div class="d-flex align-items-center">
                <i class="bi bi-exclamation-triangle-fill fs-3 me-3"></i>
                <div>
                    <h6 class="alert-heading mb-1">Error en el formulario</h6>
                    <p class="mb-0 small">Por favor corrige los campos marcados en rojo antes de continuar.</p>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // Hacer scroll suave al mensaje
    messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// Muestra mensaje de éxito usando innerHTML y Modal de Bootstrap
const showSuccessModal = () => {
    const messageContainer = document.getElementById('messageContainer');
    
    // Mostrar mensaje de éxito usando innerHTML
    messageContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <div class="d-flex align-items-center">
                <i class="bi bi-check-circle-fill fs-3 me-3"></i>
                <div>
                    <h5 class="alert-heading mb-1">¡Registro Exitoso!</h5>
                    <p class="mb-0">Gracias por registrarte. Hemos enviado un correo de confirmación a tu email.</p>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // Hacer scroll suave al mensaje
    messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // También mostrar el modal de Bootstrap
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    // Opcional: Limpiar el mensaje después de 8 segundos
    setTimeout(() => {
        messageContainer.innerHTML = '';
    }, 8000);
};

// Inicializa el smooth scroll para los enlaces del navbar
const initSmoothScroll = () => {
    // Seleccionar todos los enlaces que apuntan a IDs
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Solo aplicar si es un ID válido (no solo "#")
            if (targetId !== '#' && targetId !== '#hero') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calcular la posición considerando el navbar fijo
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar el navbar en móvil si está abierto
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
};