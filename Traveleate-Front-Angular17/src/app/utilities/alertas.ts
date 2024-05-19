import Swal from 'sweetalert2'

export class Alertas {
    alertaCamposIncompletos() {
        Swal.fire({
            title: 'Advertencia',
            text: 'Debe rellenar todos los campos',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0000ac'
          })
    }

    alertaFaltaButaca() {
        Swal.fire({
            title: 'Advertencia',
            text: 'Debe seleccionar una butaca',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0000ac'
          })
    }

    alertaError() {
        Swal.fire({
            title: 'Error',
            text: 'Ups, algo salió mal, inténtelo de nuevo',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0000ac'
          })
    }

    alertaSinResultadosViajes() {
        Swal.fire({
            title: 'Error',
            text: 'No hay viajes disponibles, intente con otra fecha',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0000ac'
          })
    }

    alertaButacaOcupada() {
        Swal.fire({
            title: 'Error',
            text: 'La butaca ya se encuentra ocupada, intentelo de nuevo',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0000ac'
          })
    }

    alertaReservado() {
        Swal.fire({
            title: 'Reservacion Exitosa',
            text: 'Se ha reservado con exito, que tenga buen viaje',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#0000ac'
          })
    }

}