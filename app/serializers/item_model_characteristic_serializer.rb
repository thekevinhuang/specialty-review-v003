class ItemModelCharacteristicSerializer < ActiveModel::Serializer
    attributes :id
    belongs_to :item_model, :characteristic
    has_many :ratings
end