class CreateLandingPages < ActiveRecord::Migration[5.1]
  def change
    create_table :landing_pages do |t|
      t.text :content_json
      t.text :content_html
      t.string :status

      t.timestamps
    end
  end
end
