import {
  FormBuilder,
  Validators,
  FormGroup,
  EmailValidator,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth-service/auth.service";
import { ViewEncapsulation } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "app/service/my-service/user/user.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "ms-loginV2-session",
  templateUrl: "./loginV2-component.html",
  styleUrls: ["./loginV2-component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginV2Component implements OnInit {
  // username: string = '';
  // password: string = '';
  public formLogin: FormGroup;
  public typePassword = "password";
  isShow = false;

  //#region
  /*
   slideConfig = {"slidesToShow": 1, "slidesToScroll": 1,"autoplay": true, "autoplaySpeed": 1000,"dots":false,"arrows":false};

   sessionSlider : any [] = [
      {
         image : "assets/img/login-slider1.jpg",
         name  : "Francisco Abbott",
         designation : "CEO-Gene",
         content : "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
      },
      {
         image : "assets/img/login-slider2.jpg",
         name  : "Samona Brown",
         designation : "Designer",
         content : "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
      },
      {
         image : "assets/img/login-slider3.jpg",
         name  : "Anna Smith",
         designation : "Managing Director",
         content : "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."
      }
   ]
   */
  //#endregion

  constructor(
    public authService: AuthService,
    public translate: TranslateService,
    private toastr: ToastrService,
    private router: Router,
    private service: UserService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$"),
          Validators.minLength(1),
        ]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }
  showPassword() {
    this.isShow = !this.isShow;
    this.typePassword = "password";
  }
  hiddenPassword() {
    this.isShow = !this.isShow;
    this.typePassword = "text";
  }
  // when email and password is correct, user logged in.
  login(value) {
    //this.authService.loginUser(value);
    console.log(value);
    this.service.login(value).subscribe(
      (result) => {
        console.log(result['headers'].get("Authorization"))
        if (result['headers'].get("Authorization")) {
          this.toastr.success('Successfully Logged In!'); 
          this.authService.setLocalUserProfile(result['headers'].get("Authorization"));
          this.router.navigate(['/model/objects']);
          
        }
        
      },
      (error) => {
        console.log(error);
        this.toastr.error("Wrong credentials");
      }
    );
  }
}
