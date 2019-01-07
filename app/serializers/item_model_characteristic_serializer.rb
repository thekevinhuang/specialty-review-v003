class ItemModelCharacteristicSerializer < ActiveModel::Serializer
    attributes :id
    belongs_to :item_model
    belongs_to :characteristic
    has_many :ratings, serializer: RatingSerializer
end