<?php

namespace App;

use Illuminate\Support\Facades\Validator;

class ValidationFacade
{

    public static function validate(array $params, array $rules, array $messages = [])
    {
        $validator = Validator::make($params, $rules, $messages);

        if ($validator->fails()) {
            $response = response();
            $response->json([
                'errors' => $validator->errors()->all(),
            ])
                ->setStatusCode(422)
                ->send();

            exit();
        }

        return $params;
    }

}
