class AddImageUrlToLandingPage < ActiveRecord::Migration[5.1]
  def change
    add_column :landing_pages, :image_url, :string
  end
end
