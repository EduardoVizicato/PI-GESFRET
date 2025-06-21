import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthTokenService } from '../../_guard/service/auth-token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isRegisterMenuOpen: boolean = false;
  activeSubMenuItem: string | null = null;

  // Flags para os links de nível superior ativos (Renomeados)
  isDashboardActive: boolean = false;
  isTravelsActive: boolean = false;
  isRegisterParentActive: boolean = false;


  constructor(private router: Router, private authTokenService: AuthTokenService) {}
  
  ngOnInit(): void {
    // Atualiza o estado ativo sempre que a navegação termina
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveState();
    });

    // Inicializa o estado ativo ao carregar o componente pela primeira vez
    this.updateActiveState();
  }

  toggleRegisterMenu(): void {
    this.isRegisterMenuOpen = !this.isRegisterMenuOpen;
  }

  // Método para atualizar o estado ativo baseado na rota atual
  updateActiveState(): void {
    const currentUrl = this.router.url;

    // Resetar todos os estados ativos primeiro
    this.isDashboardActive = false;
    this.isTravelsActive = false;
    this.activeSubMenuItem = null;
    
    // Não fechamos o menu Register automaticamente aqui, ele é controlado pelo clique
    // this.isRegisterMenuOpen = false;


    // Verificar a rota atual e definir o estado ativo apropriado
    if (currentUrl === '/dashboard') { 
      this.isDashboardActive = true;
    } else if (currentUrl.includes('/travels')) {
      this.isTravelsActive = true;
    } else if (currentUrl.includes('/register')) {
        this.isRegisterMenuOpen = true;
        this.isRegisterParentActive = true;

        if (currentUrl.includes('/register/trucks')) {
            this.activeSubMenuItem = 'caminhoes';
        } else if (currentUrl.includes('/register/loads')) {
            this.activeSubMenuItem = 'cargas';
        } else if (currentUrl.includes('/register/clients')) {
            this.activeSubMenuItem = 'clientes';
        }
        
    }

    // Se a rota não for nenhuma das acima e o menu Register estiver aberto, você pode fechar
    // if (!this.isDashboardActive && !this.isTravelsActive && !currentUrl.includes('/register')) {
    //     this.isRegisterMenuOpen = false;
    // }
  }

  // Métodos para navegar
  goToDashboard(): void {
      this.router.navigate(['/dashboard']);
  }

  goToTravels(): void { 
      this.router.navigate(['/travels']); 
  }

  goToCaminhoes(): void {
    this.router.navigate(['/register/trucks']);
  }

  goToCargas(): void {
    this.router.navigate(['/register/loads']);
  }

  goToClientes(): void {
    this.router.navigate(['/register/clients']);
  }

  // gambiarra pra fingir deslogar, tem q fazer certo depois
  LogOff(): void {
    this.authTokenService.LogOff();
    this.router.navigate(['/login']);
  }
}