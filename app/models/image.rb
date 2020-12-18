class Image < ApplicationRecord
  belongs_to :blog, optional: true
  belongs_to :work, optional: true
  mount_uploader :src, ImageUploader
end
