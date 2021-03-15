export class LandingPageModel {
  constructor(
    public id: number,
    // tslint:disable-next-line: variable-name
    public content_json: string,
    // tslint:disable-next-line: variable-name
    public content_html: string,
    public status: string,
    // tslint:disable-next-line: variable-name
    public category_id: number,
    public name: string,
    // tslint:disable-next-line: variable-name
    public image_url: {
      url: string
    }
  ) {}
}
