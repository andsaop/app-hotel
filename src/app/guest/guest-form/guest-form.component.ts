import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GuestService } from '../guest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-form-guest',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.css']
})
export class GuestFormComponent implements OnInit {

  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private guestService: GuestService,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required]],
      dataNascimento: [null],
      cpf: [null, [Validators.required]],
      nacionalidade: [null],
      sexo: [null],
      email: [null, [Validators.email, Validators.required]],
      telefone: [null, [Validators.required]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        rua: [null],
        numero: [null, [Validators.required]],
        bairro: [null],
        cidade: [null],
        estado: [null],
        pais: [null],
      }),
      pagamento: this.formBuilder.group({
        numeroCartao: [null, [Validators.required]],
        dataValidade: [null, [Validators.required]],
        nomeTitular: [null, [Validators.required]],
        codigoSeguranca: [null, [Validators.required]],
      }),
    })

    this.route.params.subscribe(
      (params: any) => {
        let id = params.id
        this.updateForm(this.guestService.getGuest(id))
      })
  }

  updateForm(guest) {

    this.form.patchValue({
      id: guest.id,
      nome: guest.nome,
      dataNascimento: guest.dataNascimento,
      cpf: guest.cpf,
      nacionalidade: guest.nacionalidade,
      sexo: guest.sexo,
      email: guest.email,
      telefone: guest.telefone,
      endereco: {
        cep: guest.endereco.cep,
        rua: guest.endereco.rua,
        numero: guest.endereco.numero,
        bairro: guest.endereco.bairro,
        cidade: guest.endereco.cidade,
        estado: guest.endereco.estado,
        pais: guest.endereco.pais
      },
      pagamento: {
        numeroCartao: guest.pagamento.numeroCartao,
        dataValidade: guest.pagamento.dataValidade,
        nomeTitular: guest.pagamento.nomeTitular,
        codigoSeguranca: guest.pagamento.codigoSeguranca
      }
    })

  }

  submit() {

    let idFormGuest = this.form.get('id');
    if (idFormGuest.value != null) {
      this.guestService.editGuest(this.form.value)
    } else {
      idFormGuest.setValue(this.setId() + 1);
      this.guestService.saveNewGuests(this.form.value);
    }
    this.router.navigate(['/guest']);

  }

  setId() {
    return this.guestService.setId();
  }

  cancel() {
    this.router.navigate(['/guest']);
  }


  //Populando endereco pelo CEP

  consultaCEP() {
    let cepValue = this.form.get('endereco.cep').value
    if (this.validaCep(cepValue)) {
      this.guestService.consultaCep(cepValue).subscribe(
        dados => this.populaDadosEndereco(dados),
        error => console.error(error)
      );
    }
  }

  validaCep(cep) {
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== "") {
      const validacep = /^[0,9]{8}$/;
      if (validacep.test(cep)) {
        this.resetaDadosForm();
        return true;
      }
    }
    return false;
  }

  resetaDadosForm() {
    this.form.patchValue({
      endereco: {
        rua: null,
        bairro: null,
        cidade: null,
        estado: null,
        pais: null
      }
    })
  }

  populaDadosEndereco(dados) {
    this.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
        pais: dados.pais
      }
    })
  }
}
