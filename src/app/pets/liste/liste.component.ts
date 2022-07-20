import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pet } from 'src/app/model/Pet.model';
import { PetService } from 'src/app/shared/services/pets.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  listeOfPets: Pet[] = [];
  statusDefault: any = ''
  formBasic: FormGroup
  submitted: boolean = false
  constructor(private petservice: PetService, private toastrService: ToastrService, private router: Router,) { }

  ngOnInit(): void {
    this.listePets('sold')
  }


  listePets(status) {
    this.petservice.getPetsbyStatus(status).subscribe(res => {
      console.log('res==+>', res);
      if (res != null) {
        this.listeOfPets = res
      } else {
        this.toastrService.error(res.message)
      }
    }, error => {
      this.toastrService.error(error.message)
    })
  }
  confirmdelete(id) {
    Swal.fire({
      title: "Suppression d'un animal",
      text: 'Voulez-vous vraiment supprimer cet animal ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.petservice.deletePet(id).pipe().subscribe(
          res => {
            if (res.status == true) {
              this.listePets('sold');

            } else {
              this.toastrService.error(res.message);
            }

          }
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })

  }
  ajouteranimal() {
    if (this.formBasic.invalid) {
      this.submitted = true;
      return;
    }

    //console.log('form', this.formBasic.value);
  }
 
}
