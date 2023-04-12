package com.nashss.se.musicplaylistservice.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.nashss.se.musicplaylistservice.activity.requests.GetProfileRequest;
import com.nashss.se.musicplaylistservice.activity.results.GetProfileResult;

public class GetProfileLambda extends LambdaActivityRunner<GetProfileRequest, GetProfileResult>
implements RequestHandler<AuthenticatedLambdaRequest<GetProfileRequest>, LambdaResponse> {


    /**
     * Handles a Lambda Function request
     *
     * @param input   The Lambda Function input
     * @param context The Lambda execution environment context object.
     * @return The Lambda Function output
     */
    @Override
    public LambdaResponse handleRequest(AuthenticatedLambdaRequest<GetProfileRequest> input, Context context) {
        return runActivity(
                () -> {
                    GetProfileRequest unauthenticatedRequest = input.fromBody(GetProfileRequest.class);
                    return input.fromUserClaims(claims ->
                    GetProfileRequest.builder()
                            .withId(unauthenticatedRequest.getProfileId())
                            .withId(claims.get("email"))
                            .build());
                },
                (request,serviceComponent) ->
                        serviceComponent.provideGetProfileActivity().handleRequest(request)
        );
    }


}
