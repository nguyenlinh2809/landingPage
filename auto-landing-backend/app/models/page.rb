class Page < ApplicationRecord
  mount_uploader :image_url, ImageUploader

  validates_presence_of :content_json, :content_html
end
