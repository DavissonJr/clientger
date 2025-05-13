import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirClientesComponent } from './inserir-clientes.component';

describe('InserirClientesComponent', () => {
  let component: InserirClientesComponent;
  let fixture: ComponentFixture<InserirClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InserirClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
