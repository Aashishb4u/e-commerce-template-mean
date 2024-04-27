import {ChangeDetectorRef, Component, Inject, PLATFORM_ID, Renderer2} from '@angular/core';
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  editMode = false;
  isBrowser = false;
  ckEditorData: any;
  categories: any = [];
  products: any = [
    {
      name: "Chain Clean Degeaser 1",
      img: "assets/products/product_1.png",
      cat: "Grease",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Radiator Flush & Clean 2",
      img: "assets/products/product_2.png",
      cat: "Additives",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Hydro Finish Restorer Polish 3",
      img: "assets/products/product_3.png",
      cat: "Cleaner",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Valve & Injector Cleaner 4",
      img: "assets/products/product_4.png",
      cat: "Cleaner",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Chain Clean Degeaser",
      img: "assets/products/product_1.png",
      cat: "Grease",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Radiator Flush & Clean",
      img: "assets/products/product_2.png",
      cat: "Additives",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Hydro Finish Restorer Polish",
      img: "assets/products/product_3.png",
      cat: "Cleaner",
      ratings: "321,546",
      price: "$35.90"
    },
    {
      name: "Valve & Injector Cleaner",
      img: "assets/products/product_4.png",
      cat: "Cleaner",
      ratings: "321,546",
      price: "$35.90"
    }
  ];
  productPage: any = 1;

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document,
    @Inject(PLATFORM_ID) private platformId,
    public sharedService: SharedService,
    private cdr: ChangeDetectorRef) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.sharedService.categories.subscribe((res: any) => {
      this.categories = res.children;
    });
  }
  onEditProduct(product) {
    this.editMode = true;
    this.loadCkEditor();
  }

  loadCkEditor() {
    const script = this._renderer2.createElement('script');
    script.type = 'application/javascript';
    script.src = 'https://cdn.ckeditor.com/ckeditor5/12.4.0/classic/ckeditor.js';
    script.onload = () => {
      const CKEditor = (window as any).ClassicEditor;
      const editorElements = document.querySelectorAll('.editor');
      console.log(editorElements);
      editorElements.forEach((editorElement) => {
        if (editorElement) {
          CKEditor.create(editorElement, {
          }).then(editor => {
            editor.model.document.on('change', () => {
              this.ckEditorData = JSON.stringify(editor.getData());
            });
          }).catch(error => {
            console.error('Error initializing CKEditor:', error);
          });
        } else {
          console.error('#editor element not found');
        }
      });
    };
    this._renderer2.appendChild(this._document.body, script);
  }
}
